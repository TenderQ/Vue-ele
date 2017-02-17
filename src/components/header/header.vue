<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
            <div class="background">
                <img :src="seller.avatar" width="100%" height="100%">
            </div>
            <transition name="fade">
                <div v-show="detailShow" class="detail">
                    <div class="detail-wrapper clearfix">
                        <div class="detail-main">
                            <h1 class="detail-title">{{seller.name}}</h1>
                            <div class="detail-star">
                                <star :size="48" :score="seller.score"></star>
                            </div>
                            <div class="detail-header">
                                <div class="line"></div>
                                <div class="text">优惠信息</div>
                                <div class="line"></div>                            
                            </div>
                            <ul v-if="seller.supports" class="supports-list">
                                <li v-for="support in seller.supports" class="support">
                                    <span class="icon" :class="classMap[support.type]"></span>
                                    <span class="text"> {{support.description}}</span>
                                </li>
                            </ul>
                            <div class="detail-header">
                                <div class="line"></div>
                                <div class="text">商家公告</div>
                                <div class="line"></div>                            
                            </div>
                            <div class="detail-bulletin">
                                <p class="content">{{seller.bulletin}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-close">
                        <i class="icon-close"  @click="hideDetail"></ul>
                    </div>
                </div>
            </div>
        </transition>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="title"></span><span class="text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>    
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from 'components/star/star';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail() {
                this.detailShow = true;
            },
            hideDetail() {
                this.detailShow = false;
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            star
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
@import '../../common/less/mixin';
.header{
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .content-wrapper{
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar{
            display: inline-block;
            vertical-align: top;
            border-radius: 2px;
        }
        .content{
            display: inline-block;
            margin-left: 16px;
            .title{
                margin: 2px 0 8px 0;
                .brand{
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    vertical-align: top;
                    .bg-image('brand');
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name{
                    margin-left: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 18px;
                }
            }
            .description{
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support{
                .icon{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    vertical-align: top;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease{
                        .bg-image('decrease_1');
                    }
                    &.discount{
                        .bg-image('discount_1');
                    }
                    &.guarantee{
                        .bg-image('guarantee_1');
                    }
                    &.invoice{
                        .bg-image('invoice_1');
                    }
                    &.special{
                        .bg-image('special_1');
                    }
                }
                .text{
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
        .support-count{
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            font-size: 10px;
            i{
                line-height: 24px;
            }
        }
    }
    .bulletin-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        background-color: rgba(7, 17, 27, 0.2); 
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .title{
            display: inline-block;
            vertical-align: top;
            margin-top: 8px;
            width: 22px;
            height: 12px;
            .bg-image('bulletin');
            background-size: 22px 12px;
            background-repeat: no-repeat; 
        }
        .text{
            vertical-align: top;
            margin: 0 4px;
            font-size: 10px;
        }
        .icon-keyboard_arrow_right{
            position: absolute;
            font-size: 10px;
            right: 8px;
            top: 8px;
        }
    }
    .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(7, 17, 27, 0.8);
        transition: all 0.5s ease;
        &.fade-enter-active,&.fade-leave-active{
            opacity: 1;
            background-color: rgba(7, 17, 27, 0.8);
        }
        &.fade-enter,&.fade-leave-active{
            opacity: 0;
            background-color: rgba(7, 17, 27, 0);
        }
        .detail-wrapper{
            min-height: 100%;
            width: 100%;
            .detail-main{
                margin-top: 64px;
                padding-bottom: 64px;
                .detail-title{
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .detail-star{
                    margin-top: 18px;
                    text-align: center;
                    padding: 2px 0;
                }
                .detail-header{
                    display: flex;                    
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .line{
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }
                    .text{
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .supports-list{
                    width: 80%;
                    margin: auto;
                    .support{
                        padding:  0 12px;
                        margin-bottom: 12px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .icon{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 16px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                            &.decrease{
                                .bg-image('decrease_2');
                            }
                            &.discount{
                                .bg-image('discount_2');
                            }
                            &.guarantee{
                                .bg-image('guarantee_2');
                            }
                            &.invoice{
                                .bg-image('invoice_2');
                            }
                            &.special{
                                .bg-image('special_2');
                            }
                        }
                        .text{
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                }
                .detail-bulletin{
                    width: 80%;
                    margin: 0 auto;
                    .content{
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
        }
        .detail-close{
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
        }
    }
}
</style>
