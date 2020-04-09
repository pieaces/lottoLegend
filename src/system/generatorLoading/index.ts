import Swal from "sweetalert2";

export default function generatorLoading(time: number) {
    const wrapper = document.querySelector<HTMLElement>('.func3-num-wrapper');
    wrapper.classList.add('none');
    let timerInterval: any;
    Swal.fire({
        title: '주어진 데이터로 번호를 조합중입니다',
        html: '데이터 처리중 <b></b> ms',
        timer: time - Math.round(Math.random()*750),
        timerProgressBar: true,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft().toString()
                    }
                }
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        wrapper.classList.remove('none');
    });
}