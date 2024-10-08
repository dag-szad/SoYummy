<template>
    <div>
        <div>
            <logo></logo>
            <h2>SoYummy</h2>
            <div>
                <ul>
                    <li>Database of recipes that can be replenished</li>
                    <li>
                        Flexible search for desired and unwanted ingredients
                    </li>
                    <li>Ability to add your own recipes with photos</li>
                    <li>Convenient and easy to use</li>
                </ul>
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <router-link to="/ingredients">Ingredients</router-link>
                </li>
                <li>
                    <router-link to="/add">Add recipes</router-link>
                </li>
                <li>
                    <router-link to="/my">My recipes</router-link>
                </li>
                <li>
                    <router-link to="/favorite">Favorite</router-link>
                </li>
                <li>
                    <router-link to="/list">Shopping list</router-link>
                </li>
            </ul>
        </nav>
        <div>
            <div>
                <h3>Subscribe to our Newsletter</h3>
                <p>
                    Subscribe up to our newsletter. Be in touch with latest news
                    and special offers, etc.
                </p>
            </div>
            <form action="">
                <input type="mail" />
                <button></button>
            </form>
            <social-media></social-media>
        </div>
    </div>
    <div>
        <p>Coded by <a href="https://github.com/dag-szad">Dag</a></p>
        <a href="">Terms of Service</a>
    </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SocialMedia from './SocialMedia.vue'
</script>
