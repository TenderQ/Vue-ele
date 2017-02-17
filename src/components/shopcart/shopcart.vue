<template>
<div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="icon icon-shopping_cart"></span>
                    </div>
                    <div class="num" v-show="totalCount">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'hightlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>       
        </div>
        <div class="ball-container">
            <template v-for="ball in balls">
                <transition name="drop" @before-enter="dropBeforeEnter" @enter="dropEnter" @after-enter="dropAfterEnter">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </template>
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref='listContent'>
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span >￥{{food.price*food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <transition name="fade">
        <div class="list-mask" v-show="listShow"  @click="hideList"></div>
    </transition>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
export default {
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectFoods: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            balls: [
            {
                id: 1,
                show: false
            },
            {
                id: 2,
                show: false
            },
            {
                id: 3,
                show: false
            },
            {
                id: 4,
                show: false
            },
            {
                id: 5,
                show: false
            }
            ],
            dropBalls: [],
            fold: true
        };
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.count;
            });
            return total;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        dropBeforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                    el.style.transform = `translate3d(0, ${y}px, 0)`;

                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                    inner.style.transform = `translate3d(${x}px, 0, 0)`;
                }
            }
        },
        dropEnter(el) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight; // 触发重绘
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
            });
        },
        dropAfterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        hideList() {
            this.fold = true;
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`);
        }
    },
    components: {
        cartcontrol
    }
};
</script>

<style lang="less" rel="stylesheet/less">
@import '../../common/less/mixin';
.shopcart{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
        display: flex;
        background: #141d27;
        font-size: 0;
        color: rgba(255,255,255,0.4);  
        .content-left{
            flex: 1;
            .logo-wrapper{
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .logo{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #2b343c;
                    text-align: center;
                    &.highlight{
                        background: rgb(0,160,220);
                        .icon{
                            color: #fff;
                        }
                    }
                    .icon{
                        font-size: 24px;
                        color: #80858a;
                        line-height: 44px;
                    }
                }
                .num{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background: rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                }
            }
            .price{
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-top: 12px;
                box-sizing: border-box;
                padding-right: 12px;
                border-right: 1px solid rgba(255,255,255,0.1);
                font-size: 16px;
                font-weight: 700;
                &.hightlight{
                    color: #fff;
                }
            }
            .desc{
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;         
            }
        }
        .content-right{
            flex: 0 0 105px;
            width: 105px;
            text-align: center;
            .pay{
                height: 48px;
                line-height: 48px;
                font-size: 12px;
                font-weight: 700;
                &.enough{
                    background: #00b43c;
                    color: #fff;
                }
                &.not-enough{
                    background: #2b333b;
                }
            }
        }
    }
    .ball-container{
        .ball{
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            &.drop-enter-active{
                transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
                .inner{
                    transition: all 0.4s linear;
                }
            }
            .inner{
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0,160,220);
            }
        }
    }
    .shopcart-list{
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
        &.fold-enter-active,&.fold-leave-active{
            transition: all 0.5s ;
            transform: translate3d(0, -100%, 0);
        }
        &.fold-enter,&.fold-leave-active{
            transform: translate3d(0, 0, 0);
        }
        .list-header{
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .title{
                float: left;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            .empty{
                float: right;
                font-size: 12px;
                color: rgb(0,160,220);
            }
        }
        .list-content{
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background: #fff;
            .food{
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                .border-bottom-1(rgba(7,17,27,0.1));
                .name{
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7,17,27);
                }
                .price{
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    color: rgb(240,20,20);
                    font-weight: 700;
                    font-size: 12px;
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    right: 0px;
                    bottom: 6px;
                }
            }
        }
    }
}

.list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background: rgba(7,17,27,0.6);
    backdrop-filter: blur(10px);
    &.fade-enter-active,&.fade-leave-active{
        opacity: 1;
        transition: all 0.5s ease;
    }
    &.fade-enter,&.fade-leave-active{
        opacity: 0;
    }
}
</style>
