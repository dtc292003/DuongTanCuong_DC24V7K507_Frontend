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
            <strong>Liên hệ yêu thích:</strong>
            <i
                v-if="contact.favorite"
                class="fas fa-check-circle text-success"
            ></i>
            <i
                v-else
                class="fas fa-times-circle text-danger"
            ></i>
        </div>

        <!-- Thích / Không thích -->
        <div class="mb-2">
            <strong>Trạng thái:</strong>

            <span
                v-if="contact.like"
                class="text-success"
            >
                Thích
            </span>

            <span
                v-else
                class="text-danger"
            >
                Không thích
            </span>
        </div>

        <!-- Danh sách sở thích -->
        <div
            class="mb-2"
            v-if="contact.like && contact.hobbies && contact.hobbies.length"
        >
            <strong>Sở thích:</strong>

            <ul class="mb-0">
                <li
                    v-for="(hobby, index) in contact.hobbies"
                    :key="index"
                >
                    {{ hobby }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.mb-2 {
    margin-bottom: 0.5rem;
}
</style>