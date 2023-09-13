<script>
  import Chapter from './Chapter.svelte'
  import ArrowDown from '../static/icons/arrowdown.svg?raw'

  export let chapterData

  const chapters = chapterData.data.map((manga) => {
    return {
      chapter: manga.attributes.chapter,
      title: manga.attributes.title ?? '',
      group:
        manga.relationships.find((rel) => rel.type === 'scanlation_group')?.attributes
          ?.name ?? 'No Group',
      user:
        manga.relationships.find((rel) => rel.type === 'user')?.attributes?.username ??
        'Anonymous',
      createdAt: manga.attributes.createdAt
    }
  })
</script>

<div class="chapters-container">
  <button>
    <span>
      {@html ArrowDown}
    </span>
    <span>Descending</span>
  </button>

  <div class="volume-container">
    <span class="volume">No Volume</span>
    {#each chapters as chapter}
      <Chapter chapterData={chapter} />
    {/each}
  </div>
</div>

<style>
  button {
    position: absolute;
    top: 4px;
    left: 0;
    display: flex;
    padding: 0.25rem 0.75rem;
    flex-direction: row;
    gap: 0.375rem;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 0.875rem;
    color: #1f2937;
    background: linear-gradient(180deg, #fff 0%, #f3f4f6 100%);
    border-radius: 0.375rem;
    border: 1px solid #eeeff1;
  }

  .chapters-container {
    position: relative;
    display: flex;
    margin: 0 calc(9.375vw + 2.1vw + 16px + 12vw);
    margin-top: 2.08vw;
  }

  .volume-container {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .volume {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding: 0.625rem;
    width: 706px;
    box-sizing: border-box;
    background: linear-gradient(270deg, #f3f4f6 32.81%, rgba(255, 255, 255, 0) 100%);
    font-family: 'IBM Plex Mono', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: #333;
  }
</style>
