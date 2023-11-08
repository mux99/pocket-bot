<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<div class="bg-gray-900">
    <div class="h-screen flex flex-col items-start justify-center items-center">
        <div class="flex flex-col">
            <div class="mb-1">
                <form method="POST" class="flex flex-col border border-gray-700 rounded bg-gray-800">
                    <div>
                        <h1 class="text-white text-3xl m-4 mb-3">Login</h1>
                    </div>
                    <div class="flex flex-col mx-4 mt-1 mb-1">
                        <label>
                            <div class="text-sm text-white font-bold">Username</div>
                            <div>
                                <input type="text" name="username" placeholder="username" required class="text-white bg-gray-900 border-2 border-gray-700 rounded p-1 px-2">
                            </div>
                        </label>
                    </div>

                    <div class="flex flex-col mx-4 mt-1 mb-1">
                        <label>
                            <div class="text-sm text-white font-bold">Password</div>
                            <div>
                                <input type="password" name="password" placeholder="password" required class="text-white bg-gray-900 border-2 border-gray-700 rounded p-1 px-2">
                            </div>
                        </label>
                    </div>

                    <div class="mx-4 mt-2">
                        <button class="rounded-lg p-1 px-3 bg-green-600 text-sm text-white font-bold">Login</button>
                    </div>

                    <div class="m-4 mt-0">
                        {#if form?.message}
                            {#if form?.success}
                                <p class="text-green-600">{form?.message}</p>
                            {:else}
                                <p class="text-red-600">{form?.message}</p>
                            {/if}
                        {/if}
                    </div>
                </form>
            </div>
            <div class="flex mt-1">
                <div class="text-white text-xs mr-1">Don't have an account?</div>
                <a href="/register" class="text-white hover:underline hover:text-blue-500 active:underline active:text-orange-500"><div class="text-xs ml-1">Register</div></a>
            </div>
        </div>
    </div>
</div>