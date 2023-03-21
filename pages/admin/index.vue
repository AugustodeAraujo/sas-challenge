<template>
  <div class="mx-auto my-container">
    <Rules
      :rulesProps="rulesList"
      @create="createRule"
      @delete="deleteRule"
      @edit="editRuleModal"
    />
    <b-modal
      v-model="modalShow"
      @hidden="resetModal"
      @ok="editRule"
      id="edit-modal"
    >
      <b-form class="input-group mb-3" @submit.prevent="edit">
        <b-form-input
          v-model="toEdit.name"
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          required
        />

        <div class="input-group-append">
          <b-button class="btn-color" type="submit"> Edit rule </b-button>
        </div>
      </b-form>
      {{ toEdit }}
    </b-modal>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      rulesList: [],
      entities: [
        {
          id: 2,
          name: 'No Pets',
          active: 1,
          order: 0,
        },
        {
          id: 4,
          name: 'Events (On Application)',
          active: 1,
          order: 0,
        },
        {
          id: 5,
          name: 'Late Check-out Available',
          active: 1,
          order: 0,
        },
        {
          id: 6,
          name: 'No Smoking',
          active: 1,
          order: 0,
        },
        {
          id: 7,
          name: 'No Parties/Events',
          active: 1,
          order: 0,
        },
        {
          id: 8,
          name: 'Age Restriction',
          active: 1,
          order: 0,
        },
      ],
      modalShow: false,
      toEdit: {},
    }
  },

  async beforeMount() {
    await this.getRuleList()
  },

  methods: {
    async getRuleList() {
      const rulesListEndpoint = this.$config.house
      await this.$axios
        .$get(rulesListEndpoint)
        .then((res) => {
          this.rulesList = res.data.entities
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async createRule(value) {
      const createRuleEndpoint = this.$config.house
      const createRuleBody = {
        house_rules: {
          name: value,
          active: 1,
        },
      }

      await this.$axios
        .$post(createRuleEndpoint, createRuleBody)
        .then((res) => this.rulesList.push(res.data))
        .catch((e) => {
          console.log(e)
        })
    },

    editRuleModal(value) {
      this.modalShow = true
      this.toEdit = { ...value }
      console.log(value)
    },

    resetModal() {
      this.toEdit = {}
    },

    async editRule(bvModalEvent) {
      bvModalEvent.preventDefault()
      console.log('handleOk', this.toEdit)

      const editRuleEndpoint = `${this.$config.house}/${this.toEdit.id}`
      const editRuleBody = {
        house_rules: {
          name: this.toEdit.name,
          active: 1,
        },
      }

      await this.$axios.$put(editRuleEndpoint, editRuleBody)
      await this.getRuleList()

      this.$nextTick(() => {
        this.$bvModal.hide('edit-modal')
      })
    },

    async deleteRule(value) {
      const deleteRuleEndpoint = `${this.$config.house}/${value}`

      await this.$axios.$delete(deleteRuleEndpoint)
      await this.getRuleList()

      console.log(deleteRuleEndpoint)
    },
  },
}
</script>

<style  scoped>
.my-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.rule-input {
  border: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-color: rgb(212 212 216);
  margin-top: 2rem;
}

.btn-color {
  background: #fb3b11 !important;
  border: none;
}

.btn-color:hover {
  background: #f84e27;
}
</style>
