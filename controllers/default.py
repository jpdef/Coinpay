from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from cStringIO import StringIO


@auth.requires_login()
def index():
    return dict(vendor_id=auth.user_id,recv_addr=auth.user.recv_addr)

<<<<<<< HEAD
def statistics():
    return dict(mess="hello")
=======
def settings():
    return dict()
>>>>>>> 5f820f7b885c8b5b8926598888b31d6545b850ea

def user():
    return dict(form=auth())

def get_address():
    return auth.user.recv_addr;

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
  db.rates.insert(value = vars.conv);
  return  vars.conv;

def qr():
    return dict(message="blah")

def exchange_stats():
    response.headers['Content-Type']='image/png'
    title='Exchanges'
    xlab='Time'
    ylab='Value'
    data_t = []
    data_v = []
    exchanges = db(db.exchange).select()
    for exchange in exchanges:
        data_t.append(exchange.time);
        data_v.append(exchange.value);
    fig=Figure()
    fig.set_facecolor('white')
    ax=fig.add_subplot(111)
    if title: ax.set_title(title)
    if xlab: ax.set_xlabel(xlab)
    if ylab: ax.set_ylabel(ylab)
    image=ax.plot(data_t,data_v)
    #image.set_interpolation('bilinear')
    canvas=FigureCanvas(fig)
    stream=StringIO()
    canvas.print_png(stream)
    return stream.getvalue()

def rate_stats():
    response.headers['Content-Type']='image/png'
    title='USD Bitcoin Conversion'
    xlab='Time'
    ylab='Price'
    data = []
    rates = db(db.rates).select()
    for rate in rates:
        data.append(rate.value);
    fig=Figure()
    fig.set_facecolor('white')
    ax=fig.add_subplot(111)
    if title: ax.set_title(title)
    if xlab: ax.set_xlabel(xlab)
    if ylab: ax.set_ylabel(ylab)
    image=ax.plot(data)
    #image.set_interpolation('bilinear')
    canvas=FigureCanvas(fig)
    stream=StringIO()
    canvas.print_png(stream)
    return stream.getvalue()


