<script>
    let modules = [
        { 
            path: '/admin', 
            active: false, 
            description: 'This is the admin module',
            submodules: [
                { path: '/admin/users', active: false, description: 'This is the users submodule' },
                { path: '/admin/parts', active: false, description: 'This is the parts submodule' },
                { path: '/admin/modules', active: false, description: 'This is the modules submodule' }
            ] 
        },
        { 
            path: '/friend', 
            active: false, 
            description: 'This is the friend module',
            submodules: [
                { path: '/friend-request', active: false, description: 'This is the friend request submodule' },
                { path: '/friend-request/accept', active: false, description: 'This is the accept friend request submodule' },
                { path: '/friend-request/decline', active: false, description: 'This is the decline friend request submodule' },
                { path: '/friend-request/send', active: false, description: 'This is the send friend request submodule' },
                { path: '/friends', active: false, description: 'This is the friends submodule' }
            ] 
        },
        { path: '/login', active: false, description: 'This is the login module' },
        { 
            path: '/parts', 
            active: false, 
            description: 'This is the parts module',
            submodules: [
                { path: '/parts/new', active: false, description: 'This is the new parts submodule' },
                { path: '/parts/requests', active: false, description: 'This is the requests parts submodule' }
            ] 
        },
        { 
            path: '/profile', 
            active: false, 
            description: 'This is the profile module',
            submodules: [
                { path: '/profile/modify', active: false, description: 'This is the modify profile submodule' }
            ] 
        },
        { path: '/register', active: false, description: 'This is the register module' },
    ];

    const toggleModule = (module) => {
        module.active = !module.active;
        if (module.submodules) {
            module.submodules.forEach(submodule => submodule.active = module.active);
        }
    };
</script>

<style>
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }
    .module {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .submodule {
        margin-left: 20px;
    }
    
    .label-text {
        margin-left: 10px;
    }
</style>

<div class="container">
    <h1 class="mb-4 text-2xl font-semibold text-gray-700 text-white">Module Activation</h1>
    <ul>
        {#each modules as module (module.path)}
            <li class="module">
                <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" bind:checked={module.active} on:change={() => toggleModule(module)} />
                    <span class="ml-2 text-gray-700 label-text">{module.path}</span>
                </label>
                <p class="ml-6 text-sm text-gray-500">{module.description}</p>
                {#if module.submodules}
                    <ul class="pl-6 mt-2">
                        {#each module.submodules as submodule (submodule.path)}
                            <li class="mb-1 pl-4 submodule">
                                <label class="flex items-center">
                                    <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" bind:checked={submodule.active} on:change={() => toggleModule(submodule)} />
                                    <span class="ml-2 text-gray-700 label-text">{submodule.path}</span>
                                </label>
                                <p class="ml-6 text-sm text-gray-500">{submodule.description}</p>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</div>