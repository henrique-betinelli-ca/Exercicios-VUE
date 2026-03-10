<template>
    <section class="d-flex flex-column align-center mt-10">
        <h2>{{ emptyCartMessages.title }}</h2>
        <p>{{ emptyCartMessages.text }}</p>
    </section>
</template>

<script>
    import * as service from "../../services/ExercicioOnze/Service.js";

    export default {
        name: "EmptyCartMessage",
        computed: {
            emptyCartMessages() {
                return service.getEmptyCartMessages();
            }
        }
    }
</script>