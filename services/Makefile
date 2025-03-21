# Image names
LOAD_GENERATOR_IMAGE = load-generator:latest
SERVICE_A_IMAGE = service-a:latest
SERVICE_B_IMAGE = service-b:latest
SERVICE_C_IMAGE = service-c:latest
SERVICE_D_IMAGE = service-d:latest
SERVICE_E_IMAGE = service-e:latest

# Kind cluster name
KIND_CLUSTER_NAME = kind

# Default target: build all images
.PHONY: all
all: load-generator service-a service-b service-c service-d service-e

# Build load generator image
.PHONY: load-generator
load-generator:
	docker build -f load-generator.Dockerfile -t $(LOAD_GENERATOR_IMAGE) .

# Build Service A image
.PHONY: service-a
service-a:
	docker build -f service-a.Dockerfile -t $(SERVICE_A_IMAGE) .

# Build Service B image
.PHONY: service-b
service-b:
	docker build -f service-b.Dockerfile -t $(SERVICE_B_IMAGE) .

# Build Service C image
.PHONY: service-c
service-c:
	docker build -f service-c.Dockerfile -t $(SERVICE_C_IMAGE) .

# Build Service D image
.PHONY: service-d
service-d:
	docker build -f service-d.Dockerfile -t $(SERVICE_D_IMAGE) .

# Build Service E image
.PHONY: service-e
service-e:
	docker build -f service-e.Dockerfile -t $(SERVICE_E_IMAGE) .

# Deploy images to kind cluster
.PHONY: kind-deploy
kind-deploy: load-generator service-a service-b service-c service-d service-e
	kind load docker-image $(LOAD_GENERATOR_IMAGE) --name $(KIND_CLUSTER_NAME)
	kind load docker-image $(SERVICE_A_IMAGE) --name $(KIND_CLUSTER_NAME)
	kind load docker-image $(SERVICE_B_IMAGE) --name $(KIND_CLUSTER_NAME)
	kind load docker-image $(SERVICE_C_IMAGE) --name $(KIND_CLUSTER_NAME)
	kind load docker-image $(SERVICE_D_IMAGE) --name $(KIND_CLUSTER_NAME)
	kind load docker-image $(SERVICE_E_IMAGE) --name $(KIND_CLUSTER_NAME)

# Clean up all built images
.PHONY: clean
clean:
	docker rmi $(LOAD_GENERATOR_IMAGE) $(SERVICE_A_IMAGE) $(SERVICE_B_IMAGE) $(SERVICE_C_IMAGE) $(SERVICE_D_IMAGE) $(SERVICE_E_IMAGE)

