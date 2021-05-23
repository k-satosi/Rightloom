<template>
  <div>
    <header>
      <b-navbar type="dark">
        <b-navbar-brand href="#">
          Rightloom
        </b-navbar-brand>
        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="showForm = !showForm">
              <b-button>
                <b-icon-cloud-upload />
              </b-button>
            </b-nav-item>
            <b-nav-item @click="editMode = !editMode">
              <b-button>
                <b-icon-pencil-square />
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                v-model="keyword"
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              />
              <b-button>
                <b-icon-search />
              </b-button>
            </b-nav-form>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-modal
        ref="uploadForm"
        v-model="showForm"
        body-bg-variant="dark"
        body-text-variant="light"
        hide-header
        hide-footer
      >
        <Upload @uploaded="refresh" />
      </b-modal>
    </header>
    <main>
      <div class="container">
        <PhotoList
          ref="photoList"
          :keyword="keyword"
          :edit-mode="editMode"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Upload from './components/UploadForm.vue';
import PhotoList from './pages/PhotoList';

export default {
  components: {
    Upload,
    PhotoList,
  },
  data() {
    return {
      editMode: false,
      showForm: false,
      keyword: '',
    };
  },
  methods: {
    refresh() {
      this.$refs.uploadForm.hide();
      this.$refs.photoList.refresh();
    }
  }
};
</script>

<style scoped>
.upload-form {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>