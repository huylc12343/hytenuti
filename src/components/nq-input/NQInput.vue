<template>
    <div class="input-wrapper" :class="{ left: labelPosition === 'left' }">
        <label v-if="label" class="input-label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>

        <input class="nq-input" :type="type" :placeholder="placeholder" :min="type === 'number' ? min : undefined"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    type: {
        type: String,
        default: 'text'
    },
    placeholder: String,
    required: Boolean,
    labelPosition: {
        type: String,
        default: 'top'
    },
    min: [String, Number]
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
}

.input-wrapper.left {
    flex-direction: row;
    align-items: center;
    gap: 12px;
}

.input-label {
    font-size: 13px;
    font-weight: 500;
}

.input-wrapper.left .input-label {
    width: 150px;
}

.nq-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}
</style>
