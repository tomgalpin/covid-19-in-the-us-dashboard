<template>
  <nav class="nav-header" role="navigation">
    <div class="container__content">
      <span class="">
        <a href="" alt="logo" class="" />
      </span>
      <div>
        <ul class="nav-items">
          <li>
            <p>Tom Galpin</p>
          </li>
          <li>
            <a href="https://github.com/tomgalpin" target="_blank">
              <div>
                <i class="fa fa-github" />
              </div>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/tom-galpin-10b66a7"
              target="_blank"
            >
              <div>
                <i class="fa fa-linkedin" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-header {
  background-color: #0596d8;
  display: flex;
  flex-flow: row nowrap;
  padding-left: 1rem;
  height: 3rem;
  align-items: center;
}

.container__content {
  flex: 1 0 auto;
}

ul {
  display: flex;
}

li {
  margin-right: 0.75rem;

  p,
  i {
    color: $text-white;
  }

  p {
    margin-right: 1.5rem;
  }
}
</style>
