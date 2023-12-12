<div class="container mx-auto px-4 py-5">
    <h1 class="text-4xl font-bold mb-4 text-white">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-6 rounded">
            <h2 class="text-2xl mb-2">Users</h2>
            <p>Manage your site's users here.</p>
            <a href="/admin/users" class="text-white underline">View Users</a>
        </div>
        <div class="bg-green-500 hover:bg-green-700 text-white font-bold p-6 rounded">
            <h2 class="text-2xl mb-2">Parts</h2>
            <p>View and manage parts in this section.</p>
            <a href="/admin/parts" class="text-white underline">View Parts</a>
        </div>
        <div class="bg-red-500 hover:bg-red-700 text-white font-bold p-6 rounded">
            <h2 class="text-2xl mb-2">Modules</h2>
            <p>Manage your site's modules here.</p>
            <a href="/admin/modules" class="text-white underline">View Modules</a>
        </div>
    </div>
    <div class="text-center mt-10 text-white">
        <br><br><br><br><br><br><br><p>You can view this section because you have an 'admin' role.<br>Only owners of this role can access this page and any other page under the '/admin' route.</p>
    </div>
</div>