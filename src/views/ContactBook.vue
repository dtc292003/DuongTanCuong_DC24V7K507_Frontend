<template>
    <div class="page">
        <!-- Ô tìm kiếm -->
        <div class="row mb-3">
            <div class="col-md-10">
                <InputSearch v-model="searchText" />
            </div>
        </div>

        <div class="row">
            <!-- Danh sách liên hệ -->
            <div class="col-md-6">
                <h4>
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </h4>

                <ContactList
                    v-if="filteredContactsCount > 0"
                    :contacts="filteredContacts"
                    v-model:activeIndex="activeIndex"
                />

                <p v-else>Không có liên hệ nào.</p>

                <div class="button-group mt-3">
                    <button
                        class="btn btn-sm btn-primary"
                        @click="refreshList"
                    >
                        <i class="fas fa-sync-alto"></i>
                        Làm mới
                    </button>

                    <button
                        class="btn btn-sm btn-success"
                        @click="goToAddContact"
                    >
                        <i class="fas fa-plus"></i>
                        Thêm mới
                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        @click="removeAllContacts"
                    >
                        <i class="fas fa-trash"></i>
                        Xóa tất cả
                    </button>
                </div>
            </div>

            <!-- Chi tiết liên hệ -->
            <div class="col-md-6">
                <div v-if="activeContact">
                    <h4>
                        Chi tiết liên hệ
                        <i class="fas fa-address-card"></i>
                    </h4>

                    <ContactCard :contact="activeContact" />
                </div>

                <div v-else>
                    <p>Chọn một liên hệ để xem chi tiết.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactCard,
        InputSearch,
        ContactList,
    },

    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",
        };
    },

    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },

    computed: {
        contactStrings() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },

        filteredContacts() {
            if (!this.searchText) return this.contacts;

            return this.contacts.filter((_contact, index) =>
                this.contactStrings[index]
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            );
        },

        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },

        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },

    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await ContactService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },

        async removeAllContacts() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await ContactService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddContact() {
            this.$router.push({
                name: "contact.add",
            });
        },
    },

    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    max-width: 750px;
    margin: auto;
    text-align: left;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.button-group .btn {
    min-width: 110px;
}
</style>