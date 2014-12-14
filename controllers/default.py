import datetime

@auth.requires_login()
def index():
    return dict(vendor_id=auth.user_id,recv_addr=auth.user.recv_addr,products=db(db.products).select())

def statistics():
    return dict(mess="hello")

def settings():
    return dict(vendor_id=auth.user_id,recv_addr=auth.user.recv_addr)

def user():
    return dict(form=auth())

def get_address():
    return auth.user.recv_addr;

def set_address():
    vars = request.post_vars
    print(vars.addr)
    db(db.auth_user.id==auth.user.id).update(recv_addr=vars.addr)
    return auth.user.recv_addr

def add_exchange():
    vars = request.post_vars
    values = [vars.value0,vars.value1,vars.value2,vars.value3,vars.value4]
    times = [vars.time0,vars.time1,vars.time2,vars.time3,vars.time4]
    for i in range(0, 4) :
        db.exchange.update_or_insert(db.exchange.time == int(times[i]),
                          value=values[i],
                          time=times[i],
                          vendor_id=auth.user_id);
    return "success"

def add_conv():  
  vars = request.post_vars;
  db.rates.insert(value = vars.conv,time=datetime.datetime.now);
  return  vars.conv;

def get_price():
    rows = db(db.products).select()
    for row in rows.find(lambda row: row.name == request.vars.choosen):
        return row.value

def exchange_stats():
    from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
    from matplotlib.figure import Figure
    from cStringIO import StringIO
    response.headers['Content-Type']='image/png'
    title='Exchanges'
    xlab='Time'
    ylab='Value'
    data_t = []
    data_v = []
    exchanges = db(db.exchange).select()
    for exchange in exchanges:
        data_t.append(datetime.datetime.fromtimestamp(exchange.time));
        data_v.append(exchange.value);
    fig=Figure()
    fig.set_facecolor('white')
    ax=fig.add_subplot(111)
    if title: ax.set_title(title)
    if xlab: ax.set_xlabel(xlab)
    if ylab: ax.set_ylabel(ylab)
    image=ax.plot_date(data_t,data_v)
    #image.set_interpolation('bilinear')
    canvas=FigureCanvas(fig)
    stream=StringIO()
    canvas.print_png(stream)
    return stream.getvalue()

def rate_stats():
    from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
    from matplotlib.figure import Figure
    from cStringIO import StringIO
    response.headers['Content-Type']='image/png'
    title='USD Bitcoin Conversion'
    xlab='Time'
    ylab='Price'
    data_t = []
    data_r = []
    rates = db(db.rates).select()
    for rate in rates:
        data_t.append(rate.time);
        data_r.append(rate.value);
    fig=Figure()
    fig.set_facecolor('white')
    ax=fig.add_subplot(111)
    if title: ax.set_title(title)
    if xlab: ax.set_xlabel(xlab)
    if ylab: ax.set_ylabel(ylab)
    image=ax.plot_date(data_t,data_r)
    #image.set_interpolation('bilinear')
    canvas=FigureCanvas(fig)
    stream=StringIO()
    canvas.print_png(stream)
    return stream.getvalue()


