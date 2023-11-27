<script>
  export let data;

  console.log(data);
</script>

<ul class="flex flex-wrap gap-y-12">
  {#each data.users as user}
    <li class="text-white w-1/3">
      <a class="text-5xl flex nowrap" href="users/{user.username}">
        <div class="truncate">{user.username}</div>
        <div class="flex whitespace-nowrap">ratio: {user.win_lose_ratio}</div>
       </a>
    </li>
  {/each}
</ul>  
