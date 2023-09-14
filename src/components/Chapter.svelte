<script>
  export let chapterData
</script>

<div class="chapter">
  <div class="title-wrapper">
    <span class="chapter-num">
      Chapter {chapterData.chapter}
    </span>
    {#if chapterData.title}
      <span class="dot-separator">•</span>
      <span class="chapter-title">
        {chapterData.title}
      </span>
    {/if}
  </div>
  <div class="info">
    <div class="uploader">
      <span>{chapterData.uploaderGroup.name}</span>
      <span>/</span>
      <span>{chapterData.uploader.name}</span>
    </div>
  </div>
</div>

<style lang="scss">
  .chapter {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font: {
      family: 'IBM Plex Mono', sans-serif;
      size: 0.875rem;
    }
    padding: 0.625rem 0.875rem;
    border: 1px solid #eeeff1;
    border-radius: 0.5rem;
    width: 706px;
    box-sizing: border-box;
    background: linear-gradient(270deg, #fff 0%, #f7f7f8 100%);
  }

  .uploader {
    display: flex;
    flex-direction: row;
    font-weight: 500;

    span {
      &:first-of-type {
        color: #9ca3af;
      }
      &:nth-of-type(2) {
        color: #d1d5db;
      }
      &:last-of-type {
        color: #646d7c;
      }
    }
  }
</style>
