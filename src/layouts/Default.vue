<template>
    <Main  avatar-background-colour="bg-nifteeBlue-900">
        <template #logo>
            <img
                class="cursor-pointer h-12 ml-3"
                src="/logo.png"
                alt="Logo"
                @click="router.push('/dashboard')"
            >
        </template>
        <template #user-menu="{ logout, clear, close }">
            <a
                href="javascript:void(0);"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                @click="handleClick('/user-settings', close)"
            >
                Settings
            </a>
            <a
                href="javascript:void(0);"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                role="menuitem"
                @click="clear"
            >
                Clear Cache
            </a>
            <a
                href="javascript:void(0);"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                role="menuitem"
                @click="logout"
            >
                Sign out
            </a>
        </template>
    </Main>
</template>

<script>
import Main from '@niftee-group/niftee-core/src/layout/Main.vue'
import { useRouter } from 'vue-router'

export default {
    name: "Default",
    components: {
        Main
    },
    setup (){
        const router = useRouter()

        function handleClick (path, callback){
            callback()

            if (router.currentRoute.path !== path){
                router.push(path)
            }
        }

        return {
            handleClick
        }
    }
}
</script>

<style scoped>

</style>
