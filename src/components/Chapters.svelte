<script>
  import Chapter from './Chapter.svelte'
  import ArrowDown from '../static/icons/arrowdown.svg?raw'

  export let chapterData

  const volumeMap = new Map()
  const volumes = new Set(chapterData.data.map((manga) => manga.attributes.volume))
  for (const volume of volumes) {
    volumeMap.set(volume, [])
  }
  chapterData.data.forEach(({ attributes, relationships }) => {
    const group = relationships.find((rel) => rel.type === 'scanlation_group')
    const user = relationships.find((rel) => rel.type === 'user')

    volumeMap.get(attributes.volume).push({
      chapter: attributes.chapter,
      title: attributes.title,
      uploaderGroup: {
        name: group?.attributes?.name ?? 'No Group',
        id: group?.id ?? ''
      },
      uploader: {
        name: user?.attributes?.username ?? 'Anonymous',
        id: user.id
      }
    })
  })
  let items = [...volumeMap].map((item) => ({
    volume: item[0],
    chapters: item[1]
  }))

  function reverse() {
    // TODO: REFETCH THE FEEDS ENDPOINT WITH ORDER=DESC
    items = items.reverse()
  }
</script>

<div class="chapters-container">
  <button on:click={reverse}>
    <span>
      {@html ArrowDown}
    </span>
    <span>Descending</span>
  </button>

  <div class="volume-container">
    {#each items as item}
      <span class="volume">{item.volume ? `Volume ${item.volume}` : 'No Volume'}</span>
      {#each item.chapters as chapter}
        <Chapter chapterData={chapter} />
      {/each}
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
