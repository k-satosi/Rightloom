<template>
  <div class="photo-list">
    <b-container fluid="p-4">
      <b-row cols="3">
        <b-col
          v-for="item in filtered"
          :key="item.id"
        >
          <div v-bind="mainProps">
            <b-img
              thumbnail
              fluid
              round
              :src="item.path"
              @click="showDetail(item)"
            />
            <b-icon-trash
              v-if="editMode"
              variant="light"
              scale="1.5"
              class="trash rounded bg-dark"
              @click="deletePhoto(photo.id)"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      ref="detail"
      body-bg-variant="dark"
      size="lg"
      title="photo"
      hide-header
      hide-footer
      centered
    >
      <b-img
        :src="path"
        fluid-grow
      />
      <b-form-tags v-model="tags" />
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    keyword: {
      type: String,
      default: '',
    },
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
      filteres: null,
    };
  },
  computed: {
    filtered() {
      if (!this.keyword) {
        return this.photos;
      }
      return this.photos.filter(photo => {
        return photo.tags && photo.tags.includes(this.keyword);
      });
    },
  },
  watch: {
    $route: {
      async handler() {
        await this.fetchPhotos();
      },
      immediate: true,
    },
    tags() {
      const updatedTags = this.tags ? this.tags.join() : '';
      if (updatedTags !== this.photo.tags) {
        this.photo.tags = updatedTags;
        axios.put('/api/photos/' + this.id, this.photo);
      }
    }
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
      this.tags = photo.tags ? photo.tags.split(',') : [];
      this.photo = photo;
      this.$refs.detail.show();
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