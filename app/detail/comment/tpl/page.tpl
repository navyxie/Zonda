<% if ( onPage > 1 ) { %>
<li class="prev">
    <a href="#comment=<%= type %>/page=<%= (onPage-1) %>">&laquo;</a>
</li>
<% } else { %>
<li class="prev active">
    <a href="javascript:;">&laquo;</a>
</li>
<% } %>

<% _.each( pageData, function( page ) { %>
<li class="page-cell <% if ( page === onPage ) {%> active<%}%>">
    <a href="#comment=<%= type %>/page=<%= page %>"><%= page %></a>
</li>
<% }) %>

<% if ( onPage < pageNum ) { %>
<li class="next">
    <a href="#comment=<%= type %>/page=<%= (onPage+1) %>">&raquo;</a>
</li>
<% } else { %>
<li class="next active">
    <a href="javascript:;">&raquo;</a>
</li>
<% } %>
