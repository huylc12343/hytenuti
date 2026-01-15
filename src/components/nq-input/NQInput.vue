<template>
    <div class="input-wrapper d-flex " :class="{ left: labelPosition === 'left' }">
        <label v-if="label" for="nq-input" class="input-label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>
        <input :type="type" :placeholder="placeholder" class="nq-input" :min="min" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
    </div>

</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    }, required: {
        type: Boolean,
        default: false
    },
    labelPosition: {
        type: String,
        default: 'top' // 'top' hoặc 'left'
    },
    min: [String, Number],

});
defineEmits(['update:modelValue'])

</script>
<style scoped>
.input-wrapper.left .input-label {
    width: 150px;
    font-size: 13px;
    font-weight: 500;
}

/* --- Label ở trên --- */
.input-wrapper.top .input-label {
    text-align: left;
}

.nq-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
}

/* --- Label ở bên trái --- */
.input-wrapper.left {
    flex-direction: row;
    align-items: center;
    gap: 12px;
}
</style>
