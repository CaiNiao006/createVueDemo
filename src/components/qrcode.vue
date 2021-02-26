<template>
    <div class="qrcode">
        <template v-if="code">
            <van-image
                    :src="url"
                    height="240"
                    width="240"

            >
                <template v-slot:error>加载失败</template>
            </van-image>
            <p class="code-num">{{code}}</p>
        </template>

    </div>
</template>

<script>
    import QRCode from 'qrcode'

    export default {
        name: "qrcode",
        props: {
            code: {
                type: String,
                default: () => undefined
            }
        },
        data() {
            return {
                url: undefined,
            }
        },
        watch: {
            'code': {
                handler: function (val) {
                    if (val) {
                        QRCode.toDataURL(this.code)
                            .then(url => {
                                this.url = url
                            })
                            .catch(() => {
                                this.$toast.fail('二维码生成失败');
                            })
                    }
                },
                deep: true,
                immediate: true //该回调将会在侦听开始之后被立即调用
            }
        }

    }
</script>

<style scoped>
    .van-image {
        display: block;
        margin: 0 auto;
    }

    .qrcode {
        padding: 10px 0;
    }

    .code-num {
        width: 100%;
        text-align: center;
        font-size: 12px;
        overflow: hidden;
    }
</style>