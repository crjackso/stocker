<template>
  <div v-if="error">
    <h2>Errors</h2>
    {{ error }}
  </div>
  <div v-else>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} | {{ user.lastName }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { gql } from 'graphql-tag'
import User from '~/models/User'

const { $api } = useNuxtApp()

const query = gql`
  query users($input: UserWhereInput!) {
    getUsers(input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`

const variables = {
  input: {}
}

const fetchUsers = async (): Promise<User[]> => {
  return await $api.query<User[]>(query, variables)
}

const { data: users, error } = await useAsyncData<User[]>(fetchUsers)
</script>
