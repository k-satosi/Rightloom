<template>
  <div class="photo-list">
    <b-container fluid="p-4">
      <b-row cols="3">
        <b-col v-for="photo in photos" :key="photo.id">
          <div v-bind="mainProps">
            <b-img thumbnail fluid round :src="photo.path" @click="showDetail(photo)"/>
            <b-icon-trash variant="light" scale="1.5" class="trash rounded bg-dark" v-if="editMode" @click="deletePhoto(photo.id)"/>
          </div>
        </b-col>
      </b-row>

    <!-- <Photo
      width="25%"
      v-for="photo in photos"
      :key="photo.id"
      :item="photo"
    /> -->
    </b-container>
    <b-modal ref="detail" body-bg-variant="dark" size="lg" title="photo"
      hide-header hide-footer centered>
      <b-img :src="this.path" fluid-grow></b-img>
      <b-form-tags v-model="tags"/>
    </b-modal>
  </div>
</template>

<script>
import Photo from '../components/Photo.vue';
import axios from 'axios';

export default {
  components: {
    Photo
  },
  props: {
    editMode: false,
  },
  data() {
    return {
      photos: [],
      mainProps: {
        width: "320",
        class: 'my-4',
      },
      path: '',
      tags: [],
      id: 0,
      photo: null,
    };
  },
  methods: {
    async fetchPhotos() {
      const response = await axios.get('/api/photos');

      if (response.status !== 200) {
        console.log(response);
      }
      console.log(response.data);
      this.photos = response.data;
    },
    refresh() {
      this.fetchPhotos();
      console.log('refresh');
    },
    async deletePhoto(id) {
      const response = await axios.delete('/api/photos/' + id);

      console.log(response);

      if (response.status === 200) {
        this.refresh();
      }
    },
    showDetail(photo) {
      this.id = photo.id;
      this.path = photo.path;
      this.tags = photo.tags.split(',');
      this.photo = photo;
      this.$refs.detail.show();
    }
  },
  watch: {
    $route: {
      async handler() {
        await this.fetchPhotos();
      },
      immediate: true,
    },
    tags() {
      this.photo.tags = this.tags.join();
      axios.put('/api/photos/' + this.id, this.photo);
    }
  },
};
</script>

<style scoped>
.trash {
  position: absolute;
  top: 40px;
  left: 30px;
}
</style>