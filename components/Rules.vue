<template>
  <div class="w-75 rule-box">
    <h1>Rules</h1>
    <ul>
      <li
        v-for="(rule, index) in rulesProps"
        :key="index"
        class="rule-item my-2"
      >
        <span id="rule">{{ rule.name }}</span>

        <div class="control">
          <b-button class="btn-color" @click="editRule(rule)">
            <img
            src="@/assets/images/edit.svg"
              alt="Edit Icon"
              class="icon"
            />
          </b-button>
          <b-button class="" @click="deleteRule(rule.id)">
            <img
              src="@/assets/images/trash.svg"
              alt="Trash Icon"
              class="icon"
            />
          </b-button>
        </div>
      </li>
    </ul>

    <b-form class="input-group mb-3" @submit.prevent="createRule">
      <b-form-input
        v-model="newRule"
        type="text"
        class="form-control"
        placeholder="New rule..."
        aria-label="New rule..."
        required
      />

      <div class="input-group-append">
        <b-button class="btn-color" type="submit"> Create rule </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    rulesProps: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data() {
    return {
      newRule: '',
      rules: [],
    }
  },

  computed: {
    validateRule() {
      if (!this.newRule && this.newRule.length < 3) {
        return null
      }
      return true
    },
  },

  methods: {
    createRule() {
      const newRule = {
        id: this.rules.length + 1,
        name: this.newRule,
        active: 1,
        order: 0,
      }

      this.$emit('create', this.newRule)
      this.newRule = ''
    },

    editRule(value) {
      this.$emit('edit', value)
    },

    deleteRule(value) {
      this.$emit('delete', value)
    },
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.icon {
  width: 24px;
  height: 24px;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
}

.form div {
  margin: 0;
}
.rule-box {
  padding: 2rem;
  border: 2px solid;
  border-color: #fb3b11;
  border-radius: 0.5rem;
}

.rule-item:nth-child(even) {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(175, 175, 175);
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rule-item:nth-child(odd) {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(235, 233, 233);
  color: rgb(117, 117, 117);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rule-input {
  width: 100%;
}

.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

/* #rule::after {
  position: absolute;
  right: 20px;
  transform: rotate(90deg) scale(2);
  display: inline-block;
  color: #fb3b11;
  transition: 0.5s;
  content: '\203A';
} */

.btn-color {
  background: #fb3b11 !important;
  border: none;
}
</style>
