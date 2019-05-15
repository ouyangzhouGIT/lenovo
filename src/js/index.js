require(["config"], () => {
	require(["swiper", "footer", "header"], (Swiper) => {
		class Index {
			constructor() {
				this.banner();
				this.a()
			}

			banner() {
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: true,
					loop: true, // 循环模式选项
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},

					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}

				})
			}

			a() {
				console.log(1)

			}
		}
		new Index()
	})
})
