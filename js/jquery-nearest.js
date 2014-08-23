/**
* Created with Sample.
* User: agrothe
* Date: 2014-08-15
* Time: 09:45 PM
* To change this template use Tools | Templates.
*/
/*!
 * jQuery Nearest plugin v1.3.0
 *
 * Finds elements closest to a single point based on screen location and pixel dimensions
 * http://gilmoreorless.github.io/jquery-nearest/
 * Open source under the MIT licence: http://gilmoreorless.mit-license.org/2011/
 *
 * Requires jQuery 1.4 or above
 * Also supports Ben Alman's "each2" plugin for faster looping (if available)
 */
!function(t,e){function n(e,n,h){e||(e="div");var a,i,o,s=t(n.container),c=s.offset()||{left:0,top:0},f=[s.width()||0,s.height()||0],u={x:[c.left,c.left+f[0]],y:[c.top,c.top+f[1]],w:[0,f[0]],h:[0,f[1]]};for(a in u)u.hasOwnProperty(a)&&(o=r.exec(n[a]),o&&(i=u[a],n[a]=(i[1]-i[0])*o[1]/100+i[0]));n.sameX===!1&&n.checkHoriz===!1&&(n.sameX=!n.checkHoriz),n.sameY===!1&&n.checkVert===!1&&(n.sameY=!n.checkVert);var l=s.find(e),d=[],p=!!n.furthest,m=!n.sameX,y=!n.sameY,v=!!n.onlyX,x=!!n.onlyY,g=p?0:1/0,k=parseFloat(n.x)||0,w=parseFloat(n.y)||0,X=parseFloat(k+n.w)||k,Y=parseFloat(w+n.h)||w,F=parseFloat(n.tolerance)||0,S=!!t.fn.each2,H=Math.min,M=Math.max;!n.includeSelf&&h&&(l=l.not(h)),0>F&&(F=0),l[S?"each2":"each"](function(e,n){var r,h,a,i,o=S?n:t(this),s=o.offset(),c=s.left,f=s.top,u=o.outerWidth(),l=o.outerHeight(),j=c+u,z=f+l,O=M(c,k),P=H(j,X),V=M(f,w),W=H(z,Y),b=P>=O,q=W>=V;(m&&y||!m&&!y&&b&&q||m&&q||y&&b||m&&v||y&&x)&&(r=b?0:O-P,h=q?0:V-W,a=v||x?v?r:h:b||q?M(r,h):Math.sqrt(r*r+h*h),i=p?a>=g-F:g+F>=a,i&&(g=p?M(g,a):H(g,a),d.push({node:this,dist:a})))});var j,z,O,P,V=d.length,W=[];if(V)for(p?(j=g-F,z=g):(j=g,z=g+F),O=0;V>O;O++)P=d[O],P.dist>=j&&P.dist<=z&&W.push(P.node);return W}var r=/^([\d.]+)%$/;t.each(["nearest","furthest","touching"],function(r,h){var a={x:0,y:0,w:0,h:0,tolerance:1,container:document,furthest:"furthest"==h,includeSelf:!1,sameX:"touching"===h,sameY:"touching"===h,onlyX:!1,onlyY:!1};t[h]=function(r,h,i){if(!r||r.x===e||r.y===e)return t([]);var o=t.extend({},a,r,i||{});return t(n(h,o))},t.fn[h]=function(e,r){if(!this.length)return this.pushStack([]);var h;if(e&&t.isPlainObject(e))return h=t.extend({},a,e,r||{}),this.pushStack(n(this,h));var i=this.offset(),o={x:i.left,y:i.top,w:this.outerWidth(),h:this.outerHeight()};return h=t.extend({},a,o,r||{}),this.pushStack(n(e,h,this))}})}(jQuery);