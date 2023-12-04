<div class="container w-fit absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 px-6 rounded-full bg-background border-blue-700 border-2 py-3 text-lg justify-center items-center">
    <div class="pulsingDot h-2 inline-block rounded-lg aspect-square bg-blue-700" />
    <p class="select-none font-medium">0 live games</p>
</div>

<style>
    .container {
        box-shadow: 0px 0px 200px 25px rgb(30 58 138 / 0.25);
    }

    .pulsingDot {
        animation: pulsing 1s ease-in-out infinite alternate;
    }

    @keyframes pulsing {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>
