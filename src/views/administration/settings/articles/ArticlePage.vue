<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <ul class="nav nav-tabs nav-line-tabs mb-5 fs-5">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{ name: 'natures.listing' }"
          >
            Natures
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            active-class="active"
            class="nav-link"
            :to="{ name: 'product-categories.listing' }"
          >
            Categories
          </router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>
