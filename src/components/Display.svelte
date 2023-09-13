<script>
  let cover = JSON.parse(window.sessionStorage.getItem('lastVisited'))?.cover
  let id = JSON.parse(window.sessionStorage.getItem('lastVisited'))?.id

  // window.addEventListener('updateLastVisited', () => {
  //   let lastVisited = JSON.parse(window.sessionStorage.getItem('lastVisited'))
  //   // lastVisited = window.sessionStorage.getItem('lastVisited')

  //   cover = lastVisited.cover
  //   id = lastVisited.id
  // })
</script>

{#if id}
  <a href="/manga/{id}">
    <img src={cover} alt="manga cover" class="fixed bottom-4 right-4 z-100" />
  </a>
{/if}

<style>
  img {
    min-width: 12vw;
    width: 12vw;
    height: 18.75vw;
    object-fit: cover;
    border-radius: 1.04vw;
    margin-bottom: 0.78125vw;
  }
</style>
