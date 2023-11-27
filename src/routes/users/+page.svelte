<script>
  export let data;

  console.log(data);
</script>

<ul class="flex flex-wrap gap-y-12">
  {#each data.users as user}
    <li class="text-white w-1/3 flex">
      <a class="text-5xl" href="users/{user.username}">{user.username} ratio: {user.win_lose_ratio}</a>
    </li>
  {/each}
</ul>  
