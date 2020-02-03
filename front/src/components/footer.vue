<template>
    <!--Bottom Footer-->
    <div class="bottom section-padding fixed-bottom">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="copyright">
                        <p>© <span>2020</span> <a href="#" class="transition">Bloggy.</a> Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Bottom Footer-->
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style >
a:hover{
    text-decoration:none;
}
.section-padding {
    padding: 20px 0;
}
.bottom {
    background-color: #2c3e50;
}
.bottom .copyright {
    font-weight: 600;
}
.copyright a {
    color: #f2ff49;
    margin-left: 3px;
    padding-right: 3px;
}
.bottom p {
    margin-bottom: 0;
    line-height: 1.1;
    font-size: 14px;
    font-weight: 400;
}
.copyright p span {
    color: #fff;
}
.bottom .copyright p, .bottom .copyright a:hover{
    color: #6c6d83;
}
</style>