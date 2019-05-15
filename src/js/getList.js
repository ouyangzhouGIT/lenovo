require(["config"],()=>{
	require(["url",'template',"footer","header"],(url,template)=>{
		class List{
			constructor () {
			  this.getList();
			}
			getList(){
			    $.get( url.rapBaseUrl + '167916/get/list', data => {
				if(data.res_code == 1) {
					console.log(url.rapBaseUrl + 'get/list')
					this.renderList(data.res_body.getlist);
			  }
			})	
			}
			
			renderList(list){
				let html = template("list-type", { list });
				$("#list-container").html(html);
			}
		}
		
		new List()
	})
})