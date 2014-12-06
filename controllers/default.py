
def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html

    if you need a simple wiki simply replace the two lines below with:
    return auth.wiki()
    """
    response.flash = T("Welcome to web2py!")
    return dict(message=T('Hello World'))


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())

def add_exchange():
    vars = request.post_vars
    #check for uniqueness
    for(i = vars.txs.length-1; i >0;i-- ):
        db.exchange.insert(value=vars.txs[i].value, 
                           date=vars.txs[i].date,
                           vender_id=auth.user_id);
    return 'nothing'

def add_conv():  
  vars = request.post_vars;
  db.rates.insert(value = vars.conv);
  return  vars.conv;

