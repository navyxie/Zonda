<!-- 标记窗口,否则每个view都会监听 -->
<div class="modal<%=modalWinId%>">
<% _.each( data, function( value ) { %> 
    
    <!-- 预定操作部分 -->
    <% if (value.name === '预定时间') {%>

    <label for="cart-reserve-checkbox" class="checkbox reserve-show">
        <!-- 如果已经预定, 则将checkbox选中 -->
        <input <% if ( hasReserve ){%> checked <%}%>id="cart-reserve-checkbox" type="checkbox">
        预定
    </label>

    <!-- 如果已经预定, 则将显示预定设置的内容 -->
    <div class="reserve-wrap" <% if ( !hasReserve ){%> style="display: none" <%}%> >

        <label for="" class="chose-date">

            请选择开始送货时间：
            <!-- 如果原来已经预定，则显示原来的日期，否则设置为当天 -->
            <input type="text" class="date-chose" value="<%=firstDay%>"/>
            <input disabled type="text" class="altField" value="<%= firstWeek %>" />

        </label>

        <ul class="cart-reserve-list row">
        <% _.each( value.values, function( tmp, key ) { %> 
        
        <!-- 如果预定了，则会显示选中项，否则第一项被选中 -->
        <li range="<%= tmp.range %>" timelong="<%= tmp.timelong %>" goods-attr-id="<%= tmp.id%>" <% if ( _.contains( on, tmp.id) ) { %> class="on" <%} else if ( !hasReserve && key === 0) { %> class="on" <%}%> > <span><%= tmp.label %></span> </li>

        <% }); %>
        </ul>

    </div>
    <% } else { %>
        <%= value.name %>           
        <ul class="cart-kind-list row">
        <% _.each( value.values, function( tmp, key ) { %> 
        
        <li range="<%= tmp.range %>" timelong="<%= tmp.timelong %>" goods-attr-id="<%= tmp.id%>" <% if ( _.contains( on, tmp.id) ) { %> class="on" <%}%> > <span><%= tmp.label %></span> </li>

        <% }); %>
        </ul>
    <%}%>

<%});%>
</div>
