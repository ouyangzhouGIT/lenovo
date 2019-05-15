require(["config"], () => {
	require(["url", "template", "cookie", "zoom", "footer", "header"], (url, template) => {
		class Datails {
			constructor() {
				this.init()
				this.addshopnum()
			}

			init() {
				let id = Number(location.search.slice(4));
				this.id = id;
				$.get(url.rapBaseUrl + "176032/get/dataList", {
					id
				}, res => {
					if (res.res_code === 1) {
						let {
							data
						} = res.res_body;
						data = { ...data,
							id
						};
						this.render(data)
					}
				})

			}

			render(data) {
				$("#detail").html(template("detail-template", {
					data
				}));
				this.price = $(".price").text()
				this.zoom();
				this.subNum();
				this.addNum();
				this.addshopCar()
			}

			zoom() {
				$(".zoom-img").elevateZoom({
					gallery: 'gal1',
					cursor: 'pointer',
					galleryActiveClass: 'active',
					borderSize: '1',
					borderColor: '#888'
				});
			}
			subNum() {
				$("#sub-num").click(() => {
					let num = Number($("#num").text())
					if (num === 1) {
						alert("已经是最小数量了！")
					} else {
						--num;
						$("#num").text(num);
						this.Price(num)
					}
				})
			}

			addNum() {
				$("#add-num").click(() => {
					let num = Number($("#num").text())
						++num;
					$("#num").text(num);
					this.Price(num)
					// $.cookie("shop"+this.id,num)
				})
			}

			Price(num) {
				$(".price").text(this.price * num)
			}

			addshopCar() {
				$(".addshopCar").click(() => {
					if ($(".login-page").css("display") === "none") {
						$(".shopCar-num").text($("#num").text())
						this.addtoshopCar()
					} else {
						alert("请先登录账户")
					}
				})
			}

			addtoshopCar() {
				let array = this.getArray()
				let obj = {},
					num = $("#num").text(),
					img = $("#img").attr("src"),
					price = this.price,
					allPrice = $(".price").text(),
					name = $(".product-attr").text()
				let id = this.id
				obj = {
					num,
					img,
					price,
					name,
					id
				}
				if (array.length === 0) {
					array.push(obj)
					window.localStorage.setItem($.cookie("username"), JSON.stringify(array));
				} else {
					let index = -1;
					let array = this.getArray()
					if(array.some((shop, i) => {
					  // some找到满足条件的就不会再继续了
					  // 所以index的值在最后就等于满足条件的索引
					  index = i;
					  console.log(shop)
					  console.log(obj)
					  return shop.id === obj.id;
					})){
					  // 有这条数据
					  console.log("has")
					  array[index].num++;
					}else{
					  // 没有这条数据
					  console.log(array)
					  console.log("no")
					  array.push(obj);
					 
					}
					 window.localStorage.setItem($.cookie("username"), JSON.stringify(array));
				}
			}

			getArray() {
				let name = $.cookie("username")
				if (name) {
					var arr = window.localStorage.getItem(name);
					arr ? arr = JSON.parse(arr) : arr = [];
					return arr;
				}
			}



			addshopnum() {
				$("#detail").on("click", ".addshopCar", () => {
					let name = $.cookie("username"),
						html = ""
					let arr = JSON.parse(window.localStorage.getItem(name))
					let shopnum = 0;
					if ($(".login-page").css("display") === "none") {
						arr.forEach((obj) => {
							let {
								num
							} = obj
							num = Number(num)
							shopnum += num;
						})
						$(".shopCar-num").text(shopnum)
					}
				})
			}



		}
		new Datails();
	})
})
