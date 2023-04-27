<?php

declare(strict_types=1);

namespace PayonePayment\Storefront\Page\Mandate;

use PayonePayment\StoreApi\Route\AbstractMandateRoute;
use Shopware\Core\Checkout\Cart\CartException;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Page\GenericPageLoader;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;

class AccountMandatePageLoader
{
    private readonly GenericPageLoader $genericLoader;

    public function __construct(
        GenericPageLoader $genericLoader,
        private readonly EventDispatcherInterface $eventDispatcher,
        private readonly AbstractMandateRoute $mandateRoute
    ) {
        $this->genericLoader = $genericLoader;
    }

    public function load(Request $request, SalesChannelContext $context): AccountMandatePage
    {
        if (!$context->getCustomer()) {
            throw CartException::customerNotLoggedIn();
        }

        $page = AccountMandatePage::createFrom(
            $this->genericLoader->load($request, $context)
        );

        $page->setMandates(
            $this->mandateRoute->load(
                $context
            )->getSearchResult()
        );

        $this->eventDispatcher->dispatch(
            new AccountMandatePageLoadedEvent($page, $context, $request)
        );

        return $page;
    }
}
