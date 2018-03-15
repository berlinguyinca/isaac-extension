(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['evaluations'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"question\">\r\n        <div class=\"row align-items-center\">\r\n            <div class=\"col-5\">\r\n                <label class=\"control-label\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\r\n            </div>\r\n            <div class=\"col-7 btn-wrap\">\r\n                <div data-toggle=\"buttons\">\r\n                    <label class=\"btn btn-disagree btn-lg\">\r\n                        <input type=\"radio\" name=\"evaluation-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"off\" choice=\"disagree\"\r\n                               key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">Disagree\r\n                    </label>\r\n                    <label class=\"btn btn-noopinion btn-lg active\">\r\n                        <input type=\"radio\" name=\"evaluation-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"off\" choice=\"default\"\r\n                               key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" checked> No Opinion\r\n                    </label>\r\n                    <label class=\"btn btn-agree btn-lg\">\r\n                        <input type=\"radio\" name=\"evaluation-"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" autocomplete=\"off\" choice=\"agree\"\r\n                               key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\"> Agree\r\n                    </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- this is the template for a standard Isaac extension -->\r\n\r\n\r\n<!-- template to be rendered -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.evaluations : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();