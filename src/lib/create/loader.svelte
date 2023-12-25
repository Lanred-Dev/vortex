<div class="rounded-[50%] aspect-[1] w-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

<style lang="postcss">
    div {
        background:
            radial-gradient(farthest-side, #2563eb 94%, #0000) top/8px 8px no-repeat,
            conic-gradient(#0000 30%, #2563eb);
        -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
        animation: rotate 1s infinite linear;
    }

    @keyframes rotate {
        100% {
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(1turn) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        }
    }
</style>
