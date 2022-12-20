<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class NotFoundController extends AbstractController
{
    public function notFound(): Response
    {
        return $this->render('error.html.twig', []);
    }
}