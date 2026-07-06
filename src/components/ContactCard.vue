<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        },
    },
};
</script>

<template>
    <div>
        <div class="mb-2">
            <strong>Tên:</strong>
            {{ contact.name }}
        </div>

        <div class="mb-2">
            <strong>E-mail:</strong>
            {{ contact.email }}
        </div>

        <div class="mb-2">
            <strong>Địa chỉ:</strong>
            {{ contact.address }}
        </div>

        <div class="mb-2">
            <strong>Điện thoại:</strong>
            {{ contact.phone }}
        </div>

        <div class="mb-2">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i
                v-if="contact.favorite"
                class="fas fa-check-circle text-success"
                
            ></i>
            <i
                v-else
                class="fas fa-times-circle text-danger"
            ></i>
        </div>
    </div>
    <div>
</div>
</template>

<style scoped>
.mb-2 {
    margin-bottom: 0.5rem;
}
</style>