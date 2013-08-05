CONFIGURE = @./tool/configure.sh

build:
	$(CONFIGURE)
	@./tool/build.framework.sh
	@./tool/build.app.sh

install:
	@./tool/deploy.app.sh

config:
	$(CONFIGURE)

update-vendor:
	$(CONFIGURE)
	@./tool/update.vendor.sh

test:
	@grunt test

clean:
	@./tool/clean.sh
