from channels import route, route_class

from main import consumers

channel_routing = [
    route_class(consumers.WSConsumer, path=r"^/$"),
]
