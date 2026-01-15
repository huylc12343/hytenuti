<template>
    <div class="footer d-flex d-flex-col d-items-center d-justify-center">
        <div class="footer-container d-flex d-flex-row d-justify-between">
            <div class="section brinding">
                <h3>Hytenuti</h3>
                <p>Your trusted store for quality products.</p>
            </div>
            <div class="section contact-info">
                <h3>Contact Us</h3>
                <p>Address: 123ABC</p>
                <p>Email: hytenuti@gmail.com</p>
                <p>Phone: +1 234 567 890</p>
            </div>
            <div class="section social-links">
                <h3>Follow Us</h3>
                <p><a href="#">Facebook</a></p>
                <p><a href="#">Twitter</a></p>
                <p><a href="#">Instagram</a></p>
            </div>
            <div class="section navigation">
                <h3>Quick Links</h3>
                <p><a href="#">Home</a></p>
                <p><a href="#">Products</a></p>
                <p><a href="#">About</a></p>
            </div>
        </div>
        <p>© {{ currentYear }} Hytenuti. All rights reserved.</p>
    </div>
</template>
<script setup>
const currentYear = new Date().getFullYear();
</script>
<style scoped>
.footer {
    width: 100%;
    background-color: var(--color-branding-primary);
}

.footer-container {
    width: 80%;
    padding: 40px 0;
    border-bottom: 1px solid #ccc;
}
</style>