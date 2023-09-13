import { ofetch } from 'ofetch';

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decode(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (typeof object[key] !== "undefined") {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => {
    if (typeof query[k] === "object" && Array.isArray(query[k])) {
      return encodeQueryItem(`${k}[]`, query[k]);
    }
    if (typeof query[k] === "object" && !Array.isArray(query[k])) {
      return Object.entries(query[k]).map(([key, value]) => encodeQueryItem(`${k}[${key}]`, value)).join("&");
    }
    return encodeQueryItem(k, query[k]);
  }).join("&");
}

const PROTOCOL_STRICT_REGEX = /^\w{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^\w{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}

function parseURL(input = "", defaultProto) {
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [protocol = "", auth, hostAndPath = ""] = (input.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
  const [host = "", path = ""] = (hostAndPath.match(/([^#/?]*)(.*)?/) || []).splice(1);
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol,
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const fullpath = parsed.pathname + (parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "") + parsed.hash;
  if (!parsed.protocol) {
    return fullpath;
  }
  return parsed.protocol + "//" + (parsed.auth ? parsed.auth + "@" : "") + parsed.host + fullpath;
}

class Fetcher {
  async get(url, query) {
    url = query ? withQuery(url, query) : url;
    const response = await ofetch(url, {
      method: "GET"
    });
    return response;
  }
  async post(url, data, query) {
    return this.baseFetcher("POST", url, data, query);
  }
  async put(url, data, query) {
    return this.baseFetcher("PUT", url, data, query);
  }
  async delete(url, data, query) {
    return this.baseFetcher("DELETE", url, data, query);
  }
  async baseFetcher(method, url, data, query) {
    url = query ? withQuery(url, query) : url;
    const response = await ofetch(url, {
      method,
      body: data
    });
    return response;
  }
}

class AtHomeEndpoint {
  constructor(baseURL) {
    this.fetcher = new Fetcher();
    this.baseURL = `${baseURL}/at-home/server`;
  }
  get(chapterID) {
    return this.fetcher.get(`${this.baseURL}/${chapterID}`);
  }
}

class ChapterEndpoint {
  constructor(baseURL) {
    this.fetcher = new Fetcher();
    this.baseURL = `${baseURL}/chapter`;
  }
  get(param1, param2) {
    if (typeof param1 === "string") {
      const cleanerFetcher = () => {
        return this.fetcher.get(`${this.baseURL}/${param1}`, param2);
      };
      if (param2?.includes) {
        param2.includes.join(",");
        return cleanerFetcher();
      }
      return cleanerFetcher();
    }
    if (param1.includes) {
      const cleanerFetcher = () => {
        return this.fetcher.get(`${this.baseURL}`, param1);
      };
      param1.includes.join(",");
      return cleanerFetcher();
    }
    return this.fetcher.get(`${this.baseURL}`, param1);
  }
}

class MangaEndpoint {
  constructor(baseURL) {
    this.fetcher = new Fetcher();
    this.baseURL = `${baseURL}/manga`;
  }
  // #endregion
  get(param1, param2) {
    if (typeof param1 === "string") {
      const cleanerFetcher = () => {
        return this.fetcher.get(`${this.baseURL}/${param1}`, param2);
      };
      if (param2?.includes) {
        param2.includes.join(",");
        return cleanerFetcher();
      }
      return cleanerFetcher();
    }
    if (param1.includes) {
      const cleanerFetcher = () => {
        return this.fetcher.get(`${this.baseURL}`, param1);
      };
      param1.includes.join(",");
      return cleanerFetcher();
    }
    return this.fetcher.get(`${this.baseURL}`, param1);
  }
  // #endregion
  getRandom(param1) {
    if (!param1) {
      return this.fetcher.get(`${this.baseURL}/random`);
    }
    if (param1.includes) {
      const cleanerFetcher = () => {
        return this.fetcher.get(`${this.baseURL}/random`, param1);
      };
      param1.includes.join(",");
      return cleanerFetcher();
    }
  }
  getFeed(id, query) {
    if (query && query.includes) {
      const cleanerFetcher = () => {
        return this.fetcher.get(`${this.baseURL}/${id}/feed`, query);
      };
      query.includes.join(",");
      return cleanerFetcher();
    }
    return this.fetcher.get(`${this.baseURL}/${id}/feed`, query);
  }
}

class StatisticsEndpoint {
  constructor(baseURL) {
    this.fetcher = new Fetcher();
    this.baseURL = `${baseURL}/statistics`;
  }
  getManga(id) {
    if (Array.isArray(id)) {
      return this.fetcher.get(`${this.baseURL}/manga/${id}`, {
        manga: id
      });
    }
    return this.fetcher.get(`${this.baseURL}/manga/${id}`);
  }
  getChapter(id) {
    if (Array.isArray(id)) {
      return this.fetcher.get(`${this.baseURL}/chapter/${id}`, {
        chapter: id
      });
    }
    return this.fetcher.get(`${this.baseURL}/chapter/${id}`);
  }
}

class MangaDexApi {
  /**
   * @param options.baseURL The base url of the api (for proxying) (default: https://api.mangadex.org)
   */
  constructor(options = { baseURL: "https://api.mangadex.org" }) {
    this.baseURL = options.baseURL;
  }
  get manga() {
    return new MangaEndpoint(this.baseURL);
  }
  get atHome() {
    return new AtHomeEndpoint(this.baseURL);
  }
  get chapter() {
    return new ChapterEndpoint(this.baseURL);
  }
  get statistics() {
    return new StatisticsEndpoint(this.baseURL);
  }
}

export { MangaDexApi as default };
