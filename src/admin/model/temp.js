'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 获取模版
     * @param type
     * @returns {{template_lists: Array, template_detail: Array, template_index: Array}}
     */
    async gettemp(type=1){
        //获取模版列表
        let temp = await this.where({type:type}).select();
        //封面模版
        let template_index =[]
        for(let v of temp){
            let obj = {}
            let action = v.action.split("_")
            //console.log(action[1]);
            if(action[0]=='index' && action[1] != undefined && v.controller=='topic'){
                obj.name=v.name;
                obj.action=action[1]+think.config("view.file_ext");
                template_index.push(obj);
            }

        }
        //列表模版
        let template_lists =[]
        for(let v of temp){
            let obj = {}
            let action = v.action.split("_");
            //console.log(action[1]);
            if(action[0]=='list' && action[1] != undefined && v.controller=='topic'){
                obj.name=v.name;
                obj.action=action[1]+think.config("view.file_ext");
                template_lists.push(obj);
            }

        }
        //详情页模版
        let template_detail =[];
        for(let v of temp){
            let obj ={};
            let action = v.action.split("_");
            if(action[0]=='detail' && action[1] != undefined && v.controller=='topic'){
                obj.name=v.name;
                obj.action=action[1]+think.config("view.file_ext");
                template_detail.push(obj);
            }
        };
        return{
            template_lists:template_lists,
            template_detail:template_detail,
            template_index:template_index
        };

    }
}