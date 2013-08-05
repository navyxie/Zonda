configure = @./tool/configure.sh

build:
	$(configure)
	@./tool/build.framework.sh
	@./tool/build.app.sh

install:
	@./tool/deploy.app.sh

config:
	$(configure)

update-vendor:
	$(configure)
	@./tool/update.vendor.sh

test:
	@grunt test

clean:
	@./tool/clean.sh
