<template>
  <div>
    <div>
      <div>
        <div>
          <div></div>
          <div>{{ comment.user }}</div>
        </div>
        <div></div>
      </div>
      <div>3분전</div>
    </div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    comment: { type: Array },
  },

  data() {
    return {
      comment: {},
    };
  },
};
</script>
