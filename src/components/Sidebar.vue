<template>
    <div class="sidebar-wrapper">
        <ul class="nav" id="nav">
            <li>
                <router-link to="/">
                    <i class="nc-icon nc-bank"></i>
                    <p>Dashboard</p>
                </router-link>
            </li>
            <li>
                <router-link to="/siswa">
                    <i class="nc-icon nc-single-02"></i>
                    <p>Data Siswa</p>
                </router-link>
            </li>
            <li>
                <router-link to="/kelas">
                    <i class="nc-icon nc-badge"></i>
                    <p>Data Kelas</p>
                </router-link>
            </li>
            <li>
                <router-link to="/buku">
                    <i class="nc-icon nc-book-bookmark"></i>
                    <p>Data Buku</p>
                </router-link>
            </li>
            <li>
                <router-link to="/peminjaman">
                    <i class="nc-icon nc-basket"></i>
                    <p>Data Peminjaman</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style scoped>
#nav a.router-link-exact-active{
    color : orangered;
    opacity: 2;
}
</style>
