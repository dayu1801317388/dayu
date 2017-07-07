
fwt = {
    register: function(d) {
        var c = d.split(".");
        var a = window;
        for (var b = 0; b < c.length; b++) {
            if (typeof a[c[b]] == "undefined") {
                a[c[b]] = new Object()
            }
            a = a[c[b]]
        }
    }
};


fwt.register("SwitchWidthMap");


(function(g) {

    SwitchWidthMap.Map = BaiduMap = function(l) {
        if (g("#bmap").length === 0) {
            return
        }
        var j = this,
        k = {
            minZoom: l.minZoom,
            maxZoom: l.maxZoom
        };
        if (l.bmapOps) {
            k = g.extend(k, l.bmapOps)
        }
        if (l.initFirst) {
            this.initFirst = l.initFirst
        }
        this.map = new BMap.Map("bmap", k);
        var m = [{
            featureType: "land",
            elementType: "geometry",
            stylers: {
                color: "#ffffff",
                hue: "#ffffff"
            }
        },
        {
            featureType: "building",
            elementType: "all",
            stylers: {
                color: "#eeeeee"
            }
        },
        {
            featureType: "manmade",
            elementType: "all",
            stylers: {
                color: "#ffffff"
            }
        }];
        this.common = l.common;
        this.point = new BMap.Point(l.common.point.lng, l.common.point.lat);
        this.radius = l.radius || 2000;
        this.capacity = l.capacity || 30;
        this.traffic = {
            keyword: ["地铁", "公交"],
            data: {
                subway: {
                    className: "ftr_subway",
                    data: null
                },
                bus: {
                    className: "ftr_bus",
                    data: null
                }
            }
        };
        this.medical = {
            keyword: ["医院"],
            data: {
                hospital: {
                    className: "ftr_hospital",
                    data: null
                }
            }
        };
        this.school = {
            keyword: ["大学", "中学", "小学", "幼儿园"],
            data: {
                school: {
                    className: "ftr_school",
                    data: null
                }
            }
        };
        this.business = {
            keyword: ["餐饮", "超市", "卖场", "银行", "ATM"],
            data: {
                restaurant: {
                    className: "ftr_restaurant",
                    data: null
                },
                supermarkert: {
                    className: "ftr_supermarkert",
                    data: null
                },
                mall: {
                    className: "ftr_mall",
                    data: null
                },
                bank: {
                    className: "ftr_bank",
                    data: null
                },
                ATM: {
                    className: "ftr_ATM",
                    data: null
                }
            }
        };
        this.map.centerAndZoom(j.point, l.initScale);
        this.init()
    };
    BaiduMap.prototype.addOverlays = function() {
        var j = this;
        function k() {}
        k.prototype = new BMap.Overlay();
        k.prototype.initialize = function() {
            var m = this.$node = new h().node;
            m.children(".common_name").html(j.common.name);
            m.on("mouseover mouseout",
            function(n) {
                if (n.type === "mouseover") {} else {
                    if (n.type === "mouseout") {}
                }
            });
            j.map.getPanes().labelPane.appendChild(m[0]);
            return m[0]
        };
        k.prototype.draw = function() {
            var m = j.map.pointToOverlayPixel(j.point);
            this.$node.css({
                left: m.x - 23 + "px",
                top: m.y - 48 + "px"
            })
        };
        var l = new BMap.Circle(j.point, j.radius, {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        j.map.addOverlay(new k());
        g("#zoomout_btn").on("click",
        function(m) {
            j.map.setZoom(j.map.getZoom() + 1)
        });
        g("#zoomin_btn").on("click",
        function(m) {
            j.map.setZoom(j.map.getZoom() - 1)
        })
    };
    BaiduMap.prototype.getSurroundData = function() {
        var j = this;
        var k = new BMap.LocalSearch(j.point, {
            onSearchComplete: function(l) {
                j.setKind(l);
                if (j.traffic.data.subway.data !== null && j.medical.data.hospital.data !== null && j.school.data.school.data !== null && j.business.data.ATM.data !== null) {
                    j.bindSwitchEvent()
                }
            }
        });
        k.setPageCapacity(j.capacity);
        k.searchNearby(j.school.keyword, j.point, j.radius);
        k.searchNearby(j.business.keyword, j.point, j.radius);
        k.searchNearby(j.medical.keyword, j.point, j.radius);
        k.searchNearby(j.traffic.keyword, j.point, j.radius)
    };
    BaiduMap.prototype.setKind = function(k) {
        var j = this;
        g.each(k,
        function() {
            var o = this,
            n = {};
            switch (o.keyword) {
            case "地铁":
                n.type = "traffic";
                n.subType = "subway";
                break;
            case "公交":
                n.type = "traffic";
                n.subType = "bus";
                break;
            case "医院":
                n.type = "medical";
                n.subType = "hospital";
                break;
            case "大学":
                n.type = "school";
                n.subType = "school";
                break;
            case "中学":
                n.type = "school";
                n.subType = "school";
                break;
            case "小学":
                n.type = "school";
                n.subType = "school";
                break;
            case "幼儿园":
                n.type = "school";
                n.subType = "school";
                break;
            case "餐饮":
                n.type = "business";
                n.subType = "restaurant";
                break;
            case "超市":
                n.type = "business";
                n.subType = "supermarkert";
                break;
            case "卖场":
                n.type = "business";
                n.subType = "mall";
                break;
            case "银行":
                n.type = "business";
                n.subType = "bank";
                break;
            case "ATM":
                n.type = "business";
                n.subType = "ATM";
                break
            }
            var l = m(o);
            function m(q) {
                var p = [];
                g.each(q,
                function() {
                    var r = this;
                    if (r.push && r.length > 0) {
                        p = r
                    }
                });
                return p
            }
            g.each(l,
            function() {
                if (this.point !== undefined && (j.map.getDistance(new BMap.Point(this.point.lng, this.point.lat), j.point)).toFixed(0) > j.radius) {
                    if (l.indexOf) {
                        l.splice(l.indexOf(this), 1)
                    }
                }
            });
            j[n.type]["data"][n.subType]["data"] = l
        })
    };
    BaiduMap.prototype.setSurroundData = function(k) {
        var j = this;
        g.each(j[k]["data"],
        function() {
            var n = this,
            m = n.className,
            o = n.data;
            g.each(o,
            function() {
                if (this.point !== undefined && (j.map.getDistance(new BMap.Point(this.point.lng, this.point.lat), j.point)).toFixed(0) < j.radius) {
                    l(this, m)
                }
            })
        });
        function l(n, m) {
            function o(r, p) {
                var q = this;
                this.p = new BMap.Point(r.point.lng, r.point.lat);
                this.d = (j.map.getDistance(q.p, j.point)).toFixed(0);
                this.o = r;
                this.c = p
            }
            o.prototype = new BMap.Overlay();
            o.prototype.initialize = function() {
                var p = this.$node = new d().node;
                p.addClass(this.c);
                p.children(".layout_detail").children(".layout_title").html(this.o.title);
                p.children(".layout_detail").children(".distance_wrap").children(".distance").html(this.d);
                p.children(".layout_detail").children(".distance_wrap").children(".time").html(this.d / 50);
                j.map.getPanes().labelPane.appendChild(p[0]);
                return p[0]
            };
            o.prototype.draw = function() {
                var p = j.map.pointToOverlayPixel(this.p);
                this.$node.css({
                    left: p.x - 15,
                    top: p.y - 37
                })
            };
            j.map.addOverlay(new o(n, m))
        }
    };
    BaiduMap.prototype.bindSwitchEvent = function() {
        var j = this;
        j.setSurroundData("traffic");
        g("#map_tag_wrap").on("click",
        function(k) {
            j.map.clearOverlays();
            j.addOverlays();
            j.setSurroundData(k.target.id);
            g(k.target).addClass(k.target.id + "_tag_hover");
            g(k.target).siblings().removeClass("traffic_tag_hover").removeClass("medical_tag_hover").removeClass("school_tag_hover").removeClass("business_tag_hover")
        })
    };
    BaiduMap.prototype.init = function(k) {
        var j = this;
        j.initFirst && j.initFirst(j);
        j.addOverlays();
        j.getSurroundData();
    };
    function h() {
        this.node = g('<div class="common" id="common"><p class="common_name"></p><i class="common_arrow_ico"></i><i class="common_pos_ico"></i></div>')
    }
    function d() {
        this.node = g('<div class="layout_wrap"><div class="layout_detail"><h5 class="layout_title"></h5><p class="distance_wrap"><span class="distance"></span>米，步行<span class="time"></span>分钟</p><i class="layout_detail_down"></i></div></div>')
    }



   






}

)   (jQuery);






