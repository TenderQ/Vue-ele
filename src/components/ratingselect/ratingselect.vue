<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{'on':onlyContent===true}" @click="toggleContent($event)">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    data() {
        return {
            mySelectType: this.selectType,
            myOnlyContent: this.onlyContent
        };
    },
    watch: {
        selectType: function (val) {
            this.mySelectType = val;
        },
        mySelectType: function (val) {
            this.$emit('on-type-change', val);
        },
        onlyContent: function () {
            this.myOnlyContent = this.onlyContent;
        },
        myOnlyContent: function () {
            this.$emit('switch-only-content', this.myOnlyContent);
        }
    },
    methods: {
        toggleContent(event) {
            if (!event._constructed) {
                return;
            }
            this.myOnlyContent = !this.myOnlyContent;
        },
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            this.mySelectType = type;
        }
    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
@import '../../common/less/mixin';
.ratingselect{
    .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        .border-bottom-1(rgba(7,17,27,0.1));
        font-size: 0;

        .block{
            display: inline-block;
            padding: 8px 12px;
            border-radius: 1px;
            margin-right: 8px;
            line-height: 16px;
            color: rgb(77,85,93);
            font-size: 12px;
            .count{
                margin-left: 2px;
                font-size: 8px;
            }
            &.active{
                color: #fff;
            }
            &.positive{
                background: rgba(0,160,220,0.2);
                &.active{
                    background: rgb(0,160,220);
                }
            }
            &.negative{
                background: rgba(77,85,93,0.2);
                &.active{
                    background: rgb(77,85,93);
                }
            }
        }
    }
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        color: rgb(147,153,159);
        font-size: 0;
        &.on{
            .icon-check_circle{
                color: #00c850;
            }
        }
        .icon-check_circle{
            display: inline-block;
            vertical-align: top;
            font-size: 24px;
            margin-right: 4px;
        }
        .text{
            font-size: 12px;
        }

    }
}
</style>
